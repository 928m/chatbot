import { jsonLoader, urlLoader } from "@/app/api/lib/loader";
import {
  getRetrievalChain,
  setRetrievalChain,
} from "@/app/api/lib/retrievalChain";

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
import fs from "fs";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const { dataType, data, customPrompt } = await req.json();
    let loader: JSONLoader | CheerioWebBaseLoader | null = null;

    if (dataType === "json") {
      fs.writeFileSync("src/app/api/data.json", JSON.stringify(data));
      loader = jsonLoader("src/app/api/data.json");
    }

    if (dataType === "url") {
      loader = urlLoader(data);
    }

    if (!loader) {
      throw new Error("Invalid data type");
    }

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
      title: `${dataType} data`,
      apiKey,
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    const retriever = vectorStore.asRetriever();

    const prompt = ChatPromptTemplate.fromTemplate(`
      ${customPrompt}:

      <context>
      {context}
      </context>

      Question: {input}
    `);

    const documentChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
    });

    setRetrievalChain(
      await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever,
      })
    );

    return NextResponse.json({ result: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}

export async function GET(req: NextRequest) {
  try {
    const humanMessage = req.nextUrl.searchParams.get("message");
    const retrievalChain = await getRetrievalChain();

    if (!retrievalChain) {
      throw new Error("retrievalChain is not defined");
    }

    const result = await retrievalChain.invoke({
      input: humanMessage,
    });

    return NextResponse.json({ result: result.answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}
