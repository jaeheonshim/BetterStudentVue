import Barcode from "react-barcode";

export default function IDBarcode(props) {
    return (
        <Barcode value={props.id} width={1.25} height={105} displayValue={false} />
    )
}