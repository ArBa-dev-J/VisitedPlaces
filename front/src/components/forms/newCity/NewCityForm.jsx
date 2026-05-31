import PageHeader from "../../PageHeader";
import NewCityFormInputs from "./NewCityFormInputs";

function NewCityForm() {
    return (
        <>
            <PageHeader />

            <h2 className="text-center pt-10 text-[1.4rem]">Add new city to the list</h2>

            <NewCityFormInputs />
        </>
    );
}

export default NewCityForm;