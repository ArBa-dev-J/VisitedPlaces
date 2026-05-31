import PageHeader from "../../PageHeader";
import NewCityFormInputs from "./NewCityFormInputs";

function NewCityForm() {
    return (
        <>
            <PageHeader />

            <section className="pt-10">
                <h2 className="text-center pt-10 pb-10 text-[1.4rem]">Add a new city to the list</h2>

                <NewCityFormInputs />
            </section>
        </>
    );
}

export default NewCityForm;