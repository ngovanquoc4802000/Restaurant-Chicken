/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

export interface Root {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function ChatRom() {
  const [todos, setTodos] = useState<Root[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [severUrl, _] = useState("https://jsonplaceholder.typicode.com/todos");
  useEffect(() => {
    const connect = async () => {
      setLoading(loading);
      setError(error);
      try {
        const response = await axios(severUrl);
        const data = response.data;
        setTodos(data);
      } catch (e) {
        setError(error);
      } finally {
        setLoading(!loading);
      }
    };
    connect();
  }, [severUrl]);
  return (
    <>
      <ul>
        {todos.map(({ title, completed }, id) => (
          <>
            <li key={id}>{completed ? title : ""}</li>
          </>
        ))}
      </ul>
    </>
  );
}
