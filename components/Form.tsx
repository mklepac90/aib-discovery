"use client";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const Form = () => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = () => {
    localStorage.setItem("response", JSON.stringify([]));
    setHistory([]);
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>
  ) => {
    if (e.key === "Enter" && isLoading === false) {
      e.preventDefault();
      setIsLoading(true);
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageInput.current?.value;
    if (message !== undefined) {
      setHistory((prev) => [...prev, message]);
      messageInput.current!.value = "";
    }

    if (!message) {
      return;
    }

    const response = await fetch("/api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    setHistory((prev) => [...prev, message]);

    let currentResponse: string[] = [];
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];
      setHistory((prev) => [...prev.slice(0, -1), currentResponse.join("")]);
    }

    setIsLoading(false);
  };

  // Save the 'history' state to 'localStorage' whenever it changes
  useEffect(() => {
    if (history.length) {
      localStorage.setItem("response", JSON.stringify(history));
    }
  }, [history]);

  // Initialize 'history' state from 'localStorage' when the component mounts
  useEffect(() => {
    const storedResponse = localStorage.getItem("response");

    if (storedResponse) {
      setHistory(JSON.parse(storedResponse));
    }
  }, []);

  return (
    <div>
      <div className="w-full justify-center sm:justify-end flex mb-10">
        <div className="bg-gray-900 shadow-md rounded-lg text-gray-100 dark:text-gray-900 dark:bg-gray-100 w-48 text-center p-2 text-xl">
          2:38 Remaining
        </div>
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-4xl sm:tracking-tight mb-2">
          Challenge
        </h2>

        <p className="text-lg w-full sm:text-2xl sm:w-4/6 mx-auto">
          Design a financial solution that enhances both personal banking
          experiences and addresses future challenges in the banking industry.
        </p>
      </div>

      <button onClick={reset}>Reset</button>

      <div className="h-[48rem] p-2 sm:p-5 bg-gray-50 dark:bg-slate-900 rounded-md border shadow transition duration-300">
        <div className="h-5/6 overflow-auto prose lg:prose-lg dark:prose-invert max-w-none">
          {isLoading
            ? history.map((item: any, index: number) => {
                return (
                  <ReactMarkdown
                    key={index}
                    className={`${
                      index % 2 === 0 ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item}
                  </ReactMarkdown>
                );
              })
            : history
            ? history.map((item: string, index: number) => {
                return (
                  <ReactMarkdown
                    key={index}
                    className={`${
                      index % 2 === 0 ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item}
                  </ReactMarkdown>
                );
              })
            : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-1 mx-auto h-1/6 bg-white dark:bg-black rounded-md border flex p-2"
        >
          <textarea
            name="Message"
            placeholder="Enter prompt"
            ref={messageInput}
            onKeyDown={handleEnter}
            className="text-lg w-full resize-none bg-transparent outline-none"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="p-1 rounded-md text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              className="h-6 w-6 rotate-90"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
