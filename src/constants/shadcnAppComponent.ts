const shadcnAppContent = `
  import { Route, Routes } from 'react-router-dom';
  import { Button } from './components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

  function App() {
    return (
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    );
  }

  function Home() {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Hello 👋, Developers!</h1>
          <p className="text-xl text-muted-foreground">Your React Playground with Shadcn/ui is Ready. 🗻</p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome to Shadcn/ui</CardTitle>
            <CardDescription>
              Beautiful components built with Radix UI and Tailwind CSS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              Let's Build! 🔥
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              No frameworks were harmed in the making of this boilerplate. 🚀
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  export default App;
`;

export default shadcnAppContent;
