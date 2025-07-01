import {GetClientDetails} from '../../components';

const ClientDetailsPage = () => {
    return (
        <div>
            <div className={'record_page'}>
                <h2 className={'title1'}>Детальна інформація клієнта</h2>
                <GetClientDetails/>
            </div>
        </div>
    );
};

export {ClientDetailsPage};