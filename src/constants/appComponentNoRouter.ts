const appContentNoRouter = `
  function App() {
    return <Home />;
  }

  function Home() {
    return (
      <div>
        <h1 className="font-bold text-3xl">Hello 👋, Developers!</h1>
        <p className="font-medium my-2">Your React Playground is Ready. 🗻</p>
        <p className="font-medium text-lg">Let's Build! 🔥</p>

        <p className="text-gray-600 mt-10">
          No frameworks were harmed in the making of this boilerplate. 🚀
        </p>
      </div>
    );
  }

  export default App;
`;

export default appContentNoRouter;
