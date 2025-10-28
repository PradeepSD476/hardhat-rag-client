import React, { use, useState } from 'react'
  import ReactMarkdown from 'react-markdown';

const App = () => {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://rag-hardhat-784777154641.asia-south1.run.app/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "question": query,
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching data:', res.status, res.statusText, errorData);
        return;
      }

      const data = await res.json();

      setChat([...chat, data?.answer]);

    } catch (error) {
      console.error('Network error or failed to fetch:', error);
    }
    setQuery('');
    setLoading(false);
  };

  return (
    <div className='mx-7'>
      <h1 className='text-red-700 font-bold text-3xl'>NO MEMORY RAG - HARDHAT</h1>
      <div className='border-2 p-5 overflow-x-scroll'>
      <div>
        {chat?.map((message, index) => (
          <div key={index} className='p-2 rounded mb-1 shadow-sm'>
            {
              <ReactMarkdown>{message}</ReactMarkdown>
            }
          </div>
        ))}
      </div>
      {loading? (
        <div className='font-bold text-red-700'>
          finding the best answer on hardhat.................
        </div>
      ):(
        <></>
      )}
      <div className='flex gap-4'>
        <input value={query} onChange={(e) => {
          setQuery(e.target.value);
        }} className='bg-card p-2 rounded mb-1 shadow-sm border-gray-500 border-2'></input>
        <button onClick={handleSend} className='bg-blue-600 text-white font-bold p-2 rounded-sm'>Send</button>
      </div>
    </div>
    </div>
  )
}

export default App
