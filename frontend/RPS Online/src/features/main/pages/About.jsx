export default function About() {
  return (
    <div className='sm:w-[70%] min-h-screen m-auto flex flex-col items-center p-6 overflow-y-auto'>
        <h1 className='text-4xl sm:text-6xl font-extrabold'>RPS Online</h1>
        <p className='text-xl sm:text-2xl sm:p-1'>A simple game of Rock, Paper, Scissors created to practice online API polling before diving into Sockets.IO</p>
        <p className='text-lg sm:text-lg sm:p-1'>This Online Rock-Paper-Scissors (RPS) game was built as part of my journey to deepen my understanding of full-stack web development. 
            Before diving into real-time communication with Socket.IO, I wanted to explore building an online multiplayer experience using API polling. 
            This project also gave me the opportunity to advance my skills in React and animation with Framer Motion, while practicing clean, maintainable component design. 
            Throughout development, I followed professional best practices to make the application feel as close to a production-ready React app as possible. 
            The backend is built using Node.js and Express, written in TypeScript, and tested with Jest to ensure reliability. 
            The frontend leverages React, Tailwind CSS for utility-first styling, and React Icons for visual polish. I also incorporated Helmet for basic security headers. 
            This project is one of several I plan to build using the MERN stack (MongoDB, Express, React, Node.js). Future projects will focus more on backend security, 
            middleware design, and real-time features like websockets.</p>
    </div>
  )
}
