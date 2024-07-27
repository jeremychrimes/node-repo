import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IWPPost {
  slug: string;
  id: number;
  title: {
    rendered: string;
  };
}
export function PostList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["postData"],
    queryFn: () =>
      axios.get<IWPPost[]>("https://jeremychrimes.com/wp-json/wp/v2/posts", {
        responseType: "json",
      }),
  });

  if (isPending) {
    return "Loading";
  }

  if (error) {
    return `An error has occured: {error}`;
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Slug</Table.Th>
          <Table.Th>Title</Table.Th>
        </Table.Tr>
      </Table.Thead>
      {data.data.map((post) => (
        <Table.Tr>
          <Table.Td>{post.slug}</Table.Td>
          <Table.Td>{post.title.rendered}</Table.Td>
        </Table.Tr>
      ))}
    </Table>
  );
}
