import {GetRecordDetails} from "../../components";

const RecordDetailsPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Детальна інформація квитанції</h2>
                <GetRecordDetails/>
            </div>
        </div>
    );
};

export {RecordDetailsPage};