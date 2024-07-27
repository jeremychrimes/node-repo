import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Button, createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostList } from "./Components";

function App() {
  const [count, setCount] = useState(0);
  const theme = createTheme({});
  const queryClient = new QueryClient();

  return (
    <>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
        <Button variant="filled" onClick={() => setCount((c) => c + 1)}>
          Test Button {count}
        </Button>
      </MantineProvider>
    </>
  );
}

export default App;
