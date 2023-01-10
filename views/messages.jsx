<html lang="en">
  <head>
    <title>Welcome to CYF Chat</title>
  </head>
  <body>
    <h1>
      CYF Chat
    </h1>

    <h2>All messages</h2>
    <ul>
    {messages.map(message => (
      <li key={message.id}>{message.text} From:  {message.from}
        <form action={"/messages/" + message.id} method="post">
      
      <button type="submit">
        Delete
      </button>
    </form>

      </li>
    ))}
    </ul>
  </body>
</html>
