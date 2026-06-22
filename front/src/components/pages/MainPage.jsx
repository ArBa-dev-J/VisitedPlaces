import PageHeader from "../PageHeader";
import MainPageBody from "../MainPageBody";

function MainPage() {
    return (
        <>
            <main className="bg-sky-600">
                <PageHeader />

                <MainPageBody />
            </main>
        </>
    );
}

export default MainPage;