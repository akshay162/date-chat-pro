import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const Home = () => {

  const [userInput, setUserInput] = useState('');

  const [isGenerating, setIsGenerating] = useState(false)

  const [hisResponseList, setHisResponseList] = useState([])
  const [herResponseList, setHerResponseList] = useState([])
  let [conversationList, setConversationList] = useState([])

  const callGenerateEndpoint = async () => {
    if (userInput == '') {
      alert("Please input")
      return
    }
    setIsGenerating(true);

    herResponseList.push(userInput);
    setHerResponseList(herResponseList);

    let fSize = herResponseList.length;
    let hSize = hisResponseList.length;

    let i = 0, j = 0;
    let input = "";
    while (i < fSize && j < hSize) {
      input += 'She: ' + herResponseList.at(i) + '\n';
      input += 'He: ' + hisResponseList.at(j) + '\n';
      i++;
      j++;
    }
    while (i < fSize) {
      input += 'She: ' + herResponseList.at(i) + '\n';
      i++;
    }
    while (j < hSize) {
      input += 'He: ' + hisResponseList.at(j) + '\n';
      j++;
    }    

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput : input }),
    });

    const data = await response.json();
    const { output, individualOutput } = data;

    hisResponseList.push(individualOutput);
    setHisResponseList(hisResponseList);

    setIsGenerating(false);
    mergeTwoconversations();
    setUserInput('')
  }

  const mergeTwoconversations = () => {

    let fSize = herResponseList.length;
    let hSize = hisResponseList.length;

    let i = 0, j = 0;
    conversationList = []
    setConversationList(conversationList)
    while (i < fSize && j < hSize) {
      conversationList.push(herResponseList.at(i))
      conversationList.push(hisResponseList.at(j))
      i++;
      j++;
    }
    while (i < fSize) {
      conversationList.push(herResponseList.at(i))
      i++;
    }
    while (j < hSize) {
      conversationList.push(hisResponseList.at(j))
      j++;
    }
    setConversationList(conversationList)
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }

  const renderConversation = () => {
    return conversationList.map((text, index) => {
        if (index % 2 == 0) {
          return <MyMessage message={text}/>
        } else {
          return <TheirMessage message={text} />
        }
    })
  }

  return (
    <div className='root'>
      <div>
        <Head>
          <title>Tinder Chat Pro</title>
        </Head>
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>Date Like a Pro </h1>
            </div>
            <div className="header-subtitle">
              <h2>Feeling confused what to reply to her ? Your reply doesn't generally interest her? Now you can reply to her in a way that touches her heart ❤️ </h2>
            </div>
          </div>
          
        </div>
      </div>

      <div className='prompt-container'>
        {conversationList && conversationList.length > 0 && renderConversation()}
      </div>
      <div className='input-text-bar'>
        <input 
          className='input-text'
          placeholder='Put her text here'
          value={userInput}
          onChange={onUserChangedText}
        />
        <button
          className= {isGenerating ? 'send-button loading': 'send-button'}
          type='submit'
          onClick={callGenerateEndpoint}
          >
            {isGenerating ? <span className="loader"></span> : <p> Reply</p>}
        </button>
      </div>
    </div>
  );
};

export default Home;
