import PageHeader from "../../PageHeader";
import PlacesList from "./PlacesList"

function PlacesListPage() {
    return (
        <>
            <main className="bg-sky-600">
                <PageHeader />

                <section className="pt-10">
                    <h2 className="text-center pt-10 pb-10 text-[1.4rem]">Places List</h2>

                    <PlacesList />
                </section>
            </main>
        </>
    );
}

export default PlacesListPage;