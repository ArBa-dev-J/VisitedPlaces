import PageHeader from "../PageHeader";
import MainPageBody from "../MainPageBody";
import Footer from "../Footer";

function MainPage() {
    return (
        <>
            <main className="bg-sky-600">
                <PageHeader />

                <MainPageBody />

                <Footer/>
            </main>
        </>
    );
}

export default MainPage;