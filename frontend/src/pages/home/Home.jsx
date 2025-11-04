import { useMediaQuery } from "react-responsive";
import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <MobileHome /> : <DesktopHome />;
};

export default Home;
