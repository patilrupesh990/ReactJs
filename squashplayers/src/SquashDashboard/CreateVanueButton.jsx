import { Button } from 'react-bootstrap';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import React, { useState } from 'react';
import CreateVanueModal from "./CreateVanueModal";

const CreateVanueButton = ({title}) => {
    const [createVanueModal, setCreateVanueModal] = useState(false);
    return (
        <React.Fragment>
            <Button className="d-flex float-right" onClick={()=>setCreateVanueModal(!createVanueModal)} variant="primary" type="submit">
                <QueuePlayNextIcon className="mr-2" />
                {title}
            </Button>
            <CreateVanueModal title={title} createVanueModal={createVanueModal} setCreateVanueModal={setCreateVanueModal} />
        </React.Fragment>
    )

}
export default CreateVanueButton