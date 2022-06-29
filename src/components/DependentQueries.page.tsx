import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email: string) => axios.get(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId: string) => axios.get(`http://localhost:4000/channels/${channelId}`);

function DependentQueriesPage({ email }: { email: string }) {
  const { data: user } = useQuery(["user", email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;
  const { data: channel } = useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });

  console.log({ user });
  console.log({ channel });
  return <div>DependentQueriesPage</div>;
}

export default DependentQueriesPage;
