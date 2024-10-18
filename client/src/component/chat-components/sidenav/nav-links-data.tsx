import ButtonLink from "./link-buttons";
import { v4 } from "uuid";
import useFetchNavData from "../../../hooks/useFetchNavData";

type dataType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  friends: [];
  sentInvites: [];
  receivedInvites: [];
  createdAt: string;
};

const FetchNavLinkData = () => {
  const { data, decodeToken, isError, isLoading } = useFetchNavData();

  if (isLoading) {
    <h1 className=" z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Loading....
    </h1>;
  }

  if (isError) {
    <h1 className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Error Try again....
    </h1>;
  }

  return (
    <section className="flex flex-col gap-3">
      {data?.data.map((el: dataType) => {
        if (decodeToken.userId !== el._id) {
          return (
            <ButtonLink key={v4()} linkTo={el._id} btnLinkText={el.username} />
          );
        }
      })}
    </section>
  );
};

export default FetchNavLinkData;
