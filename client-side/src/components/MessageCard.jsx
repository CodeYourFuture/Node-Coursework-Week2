import React from 'react'
import Card from 'react-bootstrap/Card'


function MessageCard({key, from, text, time}) {
  return (
    <Card key={key} className='yes'>
      <Card.Title>{ from }</Card.Title>
      <Card.Text>{ text}</Card.Text>
      <Card.Subtitle>{ time }</Card.Subtitle>
    </Card>
  );
    
 
}

export default MessageCard

