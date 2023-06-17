import { Box } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import BooksPage from "./allBooks/BooksPage";



function MainBooksPage() {


    return (
        <Box className="product-page">
            <Box sx={{ width: "95%", display: "flex", }}>
                <Sidebar />
                <BooksPage />
            </Box>
        </Box>
    );
}
export default MainBooksPage;