function AskForDeletion({notToShow}){
    return (
        <>
          <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-900 p-50 rounded-[18px]">
                <h2 className="text-white text-center pb-5 font-bold">Do you want to delete this?</h2>
                <div className="flex gap-30">
                    <div>
                        <button  className="cursor-pointer p-2 right-15 bg-red-500 hover:bg-red-900 rounded-[15px] text-[1.2rem]">
                            Yes
                        </button>
                    </div>

                    <div>
                        <button onClick={notToShow()} className="cursor-pointer p-2 right-15 bg-green-500 hover:bg-green-700 rounded-[15px] text-[1.2rem]">
                            No
                        </button>
                    </div>
                </div>
                {/* <p className="text-white">{error}</p> */}
            </section>
        </>
    );
}

export default AskForDeletion;