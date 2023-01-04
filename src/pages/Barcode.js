import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Image from "../BarcodePage/Image";
import Loading from "../BarcodePage/Loading";
import Upload from "../BarcodePage/Upload";
import View from "../BarcodePage/View";
import IDBarcode from "../components/IDBarcode";
import { getStudentInfo } from "../data/Gradebook";
import Footer from "../Footer";
import Header from "../Header";
import { getBase64 } from "../util/fileUtil"

export default function Barcode() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(false);
    const [didMount, setDidMount] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const goHome = () => {
        navigate("/");
    }

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    }

    const saveBarcodeFile = event => {
        if (!selectedFile) return;
        if (!selectedFile.type.includes("image")) {
            alert("You must upload an image file!");
            return;
        }

        if (selectedFile.size > 2_000_000) {
            alert("Your file is too big! Max file size: 2MB");
            return;
        }

        setLoading(true);
        getBase64(selectedFile, base64 => {
            setAppState({
                ...appState,
                barcodeImage: base64
            });
        });
    }

    const deleteBarcodeFile = () => {
        delete appState.barcodeImage;
        setAppState({
            ...appState
        });
    }

    useEffect(() => {
        if (!didMount) {
            setDidMount(true);
            return;
        }

        window.location.reload();
    }, [appState.barcodeImage]);

    return (
        <>
            <Loading visible={loading} text="Converting and saving your file. Please be patient, this may take a minute. If you're stuck on this screen after a while, reload the page and try again." />
            <Header title="Barcode" />
            
            {showImage && <Image data={appState.barcodeImage} close={() => setShowImage(false)} />}

            <div className="container pt-3">
                { appState.barcodeImage ? <View delete={deleteBarcodeFile} open={() => setShowImage(true)} /> : <Upload onFileChange={onFileChange} selectedFile={selectedFile} saveBarcodeFile={saveBarcodeFile} /> }
            
                <div className="mt-4">
                    Barcodes provided on BetterStudentVue are for convenience only and should not be used as a form of official identification. Use your best judgement.
                </div>
            </div>
            <Footer />
        </>
    )
}