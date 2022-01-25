import axios from 'axios';
import classNames from 'classnames';
import {useState,useCallback} from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';
import calc from './image/calculator.png'

function App() {

  const [chat, setChat] = useState([{sender:'server',message:'send string to calculate'}])
  const [inputString, setInputString] = useState("")

  const sendStringFunc = useCallback(() => {
    if (inputString) {
      setChat((prevState) => [
        ...prevState,
        { sender: "user", message: inputString },
      ]);
      axios
        .post("/calculate", { calculate: inputString })
        .then(({ data }) => {
          setChat((prevState) => [...prevState, data]);
          setInputString("");
        });
    }
  }, [inputString]);

  return (
    <div className="flex flex-col h-screen justify-between ">
          <ReactScrollableFeed className="flex break-all flex-col space-y-4 p-3 overflow-y-auto">
          {chat.map(({ sender, message }, i) => {
            const messageClass = classNames(
              "px-4 py-2 rounded-lg inline-block text-white",
              {
                "rounded-bl-none bg-green-500 self-start":
                  sender !== "user",
                "rounded-br-none bg-blue-600 self-end":
                  sender === "user",
              }
            );
          return <div key={i} className={messageClass}>{message}</div>
          })}
        </ReactScrollableFeed>
      <div className="relative flex">
        <input placeholder="let's calculate..."
          value={inputString}
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              sendStringFunc()
            }
          }}
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 py-3"
          onChange={(e) => {
            setInputString(e.target.value);
          }}
        />
        <button
          type="button"
          className="inline-flex items-center justify-center h-12 w-12 bg-green-500"
          onClick={sendStringFunc}
        >
        <img className="absolute" src={calc} alt="calculator"/>
        </button>
        </div>
      </div>
  );
}

export default App;
