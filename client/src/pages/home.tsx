import Auth from "../component/auth/auth";
import homeImg from "/chat2.jpeg"

const Home = () => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 w-full h-[100vh] ">
      {/* left side */}
      <main className="h-full fixed top-0 left-0 w-full -z-10 lg:relative lg:z-0">
         <img src={homeImg} alt="home-logo-image" className="h-full w-full object-cover" />
      </main>
      {/* right side */}
      {/* <section className="fixed top-0 left-0 h-screen  px-2 flex items-center justify-center"> */}
      <Auth />
      {/* </section> */}
    </section>
  );
};

export default Home;
