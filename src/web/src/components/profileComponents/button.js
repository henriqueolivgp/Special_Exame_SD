import { useAuth } from '../../hooks/AuthHook';

function Home() {

  const { logout } = useAuth();

  return (
    <>
      {/* <h3>{ }</h3> */}
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;
