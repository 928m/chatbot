import {
  HarmBlockThreshold,
  HarmCategory,
  TaskType,
} from "@google/generative-ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
// import { AIMessage, HumanMessage } from "langchain/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const { message: humanMessage } = await req.json();
    const loader = new CheerioWebBaseLoader(
      "https://react.dev/reference/react"
    );

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const model = new ChatGoogleGenerativeAI({
      apiKey,
      modelName: "gemini-1.0-pro",
      maxOutputTokens: 2048,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });

    const embeddings = new GoogleGenerativeAIEmbeddings({
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "React Reference",
      apiKey,
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    const retriever = vectorStore.asRetriever();

    const prompt = ChatPromptTemplate.fromTemplate(`
      한국어로 답해주세요.
      제공된 문서와 문맥을 기반으로 질문에 답하십시오.
      예제 코드 만들어주세요.
      참고한 문서의 원본 내용이 있는 링크도 함께 제공해주세요.:

      <context>
      {context}
      </context>

      Question: {input}
    `);

    const documentChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const result = await retrievalChain.invoke({
      input: humanMessage,
    });

    return NextResponse.json({ result: result.answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}
