let conversations = [{
    users: ["", ""],
    id: 0,
    messages: []
  },
  {
    users: ["Aviad1", "Shir1"],
    id: 1,
    messages: [
      {
        user: "Aviad",
        type: "text",
        content: "Hi Shir,how's it going?",
        timeStamp: new Date(
          2022, 4, 22, 16, 31).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "I'm great, how are you?",
        timeStamp: new Date(
          2022, 4, 22, 17, 31).toDateString()
      },
      {
        user: "Aviad",
        type: "text",
        content: "Awsome, can you help me with something in github?",
        timeStamp: new Date(
          2022, 4, 22, 17, 32).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Sure! what do you need?",
        timeStamp: new Date(
          2022, 4, 22, 17, 33).toDateString()
      },
      {
        user: "Aviad",
        type: "text",
        content: "I'm trying to solve a conflict in merging to dev",
        timeStamp: new Date(
          2022, 4, 22, 17, 34).toDateString()
      },
      {
        user: "Aviad",
        type: "video",
        content: "gitConflict.mp4",
        timeStamp: new Date(
          2022, 4, 22, 17, 34).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Ok, I'll go check it now",
        timeStamp: new Date(
          2022, 4, 22, 17, 35).toDateString()
      },
      {
        user: "Aviad",
        type: "recording",
        content: "thank-you.mp3",
        timeStamp: new Date(
          2022, 4, 22, 17, 37).toDateString()
      },
    ]
  },
  {
    users: ["Shir1", "Reut1"],
    id: 2,
    messages: [
      {
        user: "Shir",
        type: "img",
        content: "hello.jpg",
        timeStamp: new Date(
          2022, 4, 20, 14, 30).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "Hi :)",
        timeStamp: new Date(
          2022, 4, 20, 14, 31).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "What's up?",
        timeStamp: new Date(
          2022, 4, 20, 14, 32).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "I'm good, doing Pesah homework",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "You?",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()

      },
      {
        user: "Reut",
        type: "text",
        content: "I'm great, doing homework too",
        timeStamp: new Date(
          2022, 4, 20, 14, 35).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Good for you, i'm watching cat videos",
        timeStamp: new Date(
          2022, 4, 20, 14, 36).toDateString()
      },
      {
        user: "Shir",
        type: "recording",
        content: "please-take-your-seats.mp3",
        timeStamp: new Date(
          2022, 4, 20, 14, 53).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "send me a happy birthday video please!",
        timeStamp: new Date(
          2022, 4, 20, 14, 53).toDateString()
      },
      {
        user: "Shir",
        type: "video",
        content: "happyBirthday.mp4",
        timeStamp: new Date(
          2022, 4, 20, 14, 54).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "wow! so sweet!",
        timeStamp: new Date(
          2022, 4, 20, 14, 59).toDateString()
      },
    ]
  },
  {
    users: ["Daniel1", "Reut1"],
    id: 3,
    messages: [
      {
        user: "Daniel",
        type: "text",
        content: "Hi :)",
        timeStamp: new Date(
          2022, 4, 22, 18, 10).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "Hi :)",
        timeStamp: new Date(
          2022, 4, 22, 18, 11).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "What's up?",
        timeStamp: new Date(
          2022, 4, 22, 18, 13).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "all good",
        timeStamp: new Date(
          2022, 4, 22, 18, 15).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "how are you?",
        timeStamp: new Date(
          2022, 4, 22, 18, 15).toDateString()
      },
      {
        user: "Reut",
        type: "text",
        content: "I'm great, thanks for asking",
        timeStamp: new Date(
          2022, 4, 22, 18, 16).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "Check out this new cat!",
        timeStamp: new Date(
          2022, 4, 22, 18, 16).toDateString()
      },
      {
        user: "Daniel",
        type: "img",
        content: "chatCat.jpg",
        timeStamp: new Date(
          2022, 4, 22, 18, 16).toDateString()
      },
    ]
  },
  {
    users: ["Sam1", "Daniel1"],
    id: 4,
    messages: [
      {
        user: "Sam",
        type: "text",
        content: "Hey man",
        timeStamp: new Date(
          2022, 4, 25, 6, 42).toDateString()
      },
      {
        user: "Sam",
        type: "text",
        content: "I think you and I are just Bots",
        timeStamp: new Date(
          2022, 4, 25, 6, 43).toDateString()
      },
      {
        user: "Sam",
        type: "img",
        content: "robots.jpg",
        timeStamp: new Date(
          2022, 4, 25, 6, 44).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "I can't believe it!",
        timeStamp: new Date(
          2022, 4, 25, 6, 46).toDateString()
      },
      {
        user: "Sam",
        type: "text",
        content: "Well, better start finding another job",
        timeStamp: new Date(
          2022, 4, 25, 6, 48).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "Know anyone looking to buy instagram followers?",
        timeStamp: new Date(
          2022, 4, 25, 6, 53).toDateString()
      },
      {
        user: "Daniel",
        type: "recording",
        content: "laugh.mp3",
        timeStamp: new Date(
          2022, 4, 25, 6, 53).toDateString()
      },
    ]
  },
  {
    users: ["Shir1", "Sam1"],
    id: 5,
    messages: [
      {
        user: "Shir",
        type: "img",
        content: "hello.jpg",
        timeStamp: new Date(
          2022, 4, 20, 14, 30).toDateString()
      },
      {
        user: "Sam",
        type: "text",
        content: "Hi :)",
        timeStamp: new Date(
          2022, 4, 20, 14, 31).toDateString()
      },
      {
        user: "Sam",
        type: "text",
        content: "What's up?",
        timeStamp: new Date(
          2022, 4, 20, 14, 32).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "I'm good, doing Pesah homework",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "You?",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()

      },
      {
        user: "Sam",
        type: "text",
        content: "I'm great, doing homework too",
        timeStamp: new Date(
          2022, 4, 20, 14, 35).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Good for you, i'm watching cat videos",
        timeStamp: new Date(
          2022, 4, 20, 14, 36).toDateString()
      },
      {
        user: "Shir",
        type: "recording",
        content: "please-take-your-seats.mp3",
        timeStamp: new Date(
          2022, 4, 20, 14, 53).toDateString()
      },
      {
        user: "Shir",
        type: "video",
        content: "pianoCat.mp4",
        timeStamp: new Date(
          2022, 4, 20, 14, 54).toDateString()
      },
      {
        user: "Sam",
        type: "text",
        content: "wow! so sweet!",
        timeStamp: new Date(
          2022, 4, 20, 14, 59).toDateString()
      },
    ]
  },
  {
    users: ["Shir1", "Daniel1"],
    id: 6,
    messages: [
      {
        user: "Shir",
        type: "text",
        content: "Hey man",
        timeStamp: new Date(
          2022, 4, 25, 6, 42).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "I think you and I are just Bots",
        timeStamp: new Date(
          2022, 4, 25, 6, 43).toDateString()
      },
      {
        user: "Shir",
        type: "img",
        content: "robots.jpg",
        timeStamp: new Date(
          2022, 4, 25, 6, 44).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "I can't believe it!",
        timeStamp: new Date(
          2022, 4, 25, 6, 46).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Well, better start finding another job",
        timeStamp: new Date(
          2022, 4, 25, 6, 48).toDateString()
      },
      {
        user: "Daniel",
        type: "text",
        content: "Know anyone looking to buy instagram followers?",
        timeStamp: new Date(
          2022, 4, 25, 6, 53).toDateString()
      },
      {
        user: "Daniel",
        type: "recording",
        content: "laugh.mp3",
        timeStamp: new Date(
          2022, 4, 25, 6, 53).toDateString()
      },
    ]
  },
  {
    users: ["Shir1", "Dana1"],
    id: 7,
    messages: [
      {
        user: "Shir",
        type: "img",
        content: "hello.jpg",
        timeStamp: new Date(
          2022, 4, 20, 14, 30).toDateString()
      },
      {
        user: "Dana",
        type: "text",
        content: "Hi :)",
        timeStamp: new Date(
          2022, 4, 20, 14, 31).toDateString()
      },
      {
        user: "Dana",
        type: "text",
        content: "What's up?",
        timeStamp: new Date(
          2022, 4, 20, 14, 32).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "I'm good, doing Pesah homework",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "You?",
        timeStamp: new Date(
          2022, 4, 20, 14, 33).toDateString()

      },
      {
        user: "Dana",
        type: "text",
        content: "I'm great, doing homework too",
        timeStamp: new Date(
          2022, 4, 20, 14, 35).toDateString()
      },
      {
        user: "Shir",
        type: "text",
        content: "Good for you, i'm watching cat videos",
        timeStamp: new Date(
          2022, 4, 20, 14, 36).toDateString()
      },
      {
        user: "Shir",
        type: "recording",
        content: "please-take-your-seats.mp3",
        timeStamp: new Date(
          2022, 4, 20, 14, 53).toDateString()
      },
      {
        user: "Shir",
        type: "video",
        content: "pianoCat.mp4",
        timeStamp: new Date(
          2022, 4, 20, 14, 54).toDateString()
      },
      {
        user: "Dana",
        type: "text",
        content: "wow! so sweet!",
        timeStamp: new Date(
          2022, 4, 20, 14, 59).toDateString()
      },
    ]
  },
  ]

  export default conversations;