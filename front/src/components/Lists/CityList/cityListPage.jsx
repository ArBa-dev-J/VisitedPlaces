import PageHeader from "../../PageHeader";
import CityList from "./CityList";

function CityListPage() {
    return (
        <>
            <main className="bg-sky-600">
                <PageHeader />

                <section className="pt-10">
                    <h2 className="text-center pt-10 pb-10 text-[1.4rem]">City List</h2>

                    <CityList />
                </section>
            </main>
        </>
    );
}

export default CityListPage;