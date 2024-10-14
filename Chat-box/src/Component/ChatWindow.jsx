import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Card, CardContent, Typography, AppBar, Toolbar, Avatar, Badge } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const randomReplies = [
    'Hello! How are you?',
    'I am just a bot 😄',
    'That sounds interesting!',
    'Can you tell me more?',
    'I am here to assist you!',
    'Thank you for your message!',
    'Sure, let me help you with that!',
    'I am just testing the random reply system.',
    'Wow, that’s cool!',
    'Let’s keep chatting! 😊',
  ];

  const getRandomReply = () => {
    const randomIndex = Math.floor(Math.random() * randomReplies.length);
    return randomReplies[randomIndex];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    setChat((prevChat) => [
      ...prevChat,
      { id: Date.now(), text: message, sender: 'You', timestamp: new Date().toLocaleTimeString() }
    ]);

    setMessage('');
  };

  useEffect(() => {
    if (chat.length > 0 && chat[chat.length - 1].sender === 'You') {
      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { id: Date.now(), text: getRandomReply(), sender: 'Bot', timestamp: new Date().toLocaleTimeString() }
        ]);
      }, 1000);
    }
  }, [chat]);

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100vw',
        height: '100vh',
        bgcolor: '#f4f4f4'
      }}
    >
      {/* Improved Header */}
      <AppBar position="static" color="primary" sx={{ bgcolor: '#075E54' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: '#25D366', marginRight: 1 }}>B</Avatar>
            <Box>
              <Typography variant="h6" component="div" sx={{ color: '#fff' }}>
                Bot Assistant
              </Typography>
              <Typography variant="caption" component="div" sx={{ color: '#c9c9c9' }}>
                Online
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton sx={{ color: '#fff' }}>
              <ChatIcon />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: 2,
          bgcolor: '#fff',
        }}
      >
        {chat.map((msg) => (
          <Box 
            key={msg.id} 
            sx={{ 
              display: 'flex', 
              justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
              marginBottom: 1.5 
            }}
          >
            <Card 
              sx={{ 
                maxWidth: '45%',  // Make the message box smaller
                padding: 1,
                borderRadius: '15px',
                backgroundColor: msg.sender === 'You' ? '#DCF8C6' : '#fff',
                boxShadow: 3,
                position: 'relative'
              }}
            >
              <CardContent sx={{ paddingBottom: '8px !important' }}>
                <Typography variant="body2">
                  {msg.text}
                </Typography>
                <Typography variant="caption" sx={{ color: '#888', textAlign: 'right', marginTop: 1, display: 'block' }}>
                  {msg.timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: 2, padding: 2, bgcolor: '#F1F1F1' }}>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
          InputProps={{
            style: { borderRadius: 25 },
          }}
        />
        <IconButton color="primary" type="submit" sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' }, borderRadius: '50%' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default App;