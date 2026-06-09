import PageHeader from "../../PageHeader";
import NewPlaceFormInput from "./NewPlaceFormInput"
function NewPlaceForm() {
    return (
        <>
            <main className="bg-sky-600">
                <PageHeader />

                <section className="pt-10">
                    <h2 className="text-center pt-10 pb-10 text-[1.4rem]">Add a new visited place to the list</h2>

                    <NewPlaceFormInput />
                </section>
            </main>
        </>
    );
}

export default NewPlaceForm;