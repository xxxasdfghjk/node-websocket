import { styled } from "@mui/system";
import { Button } from "@mui/material";
type Props = {
    onClickButton: () => void;
};
const DisconnectedPage = (props: Props) => {
    return (
        <SContainer>
            <Button variant={"outlined"} onClick={props.onClickButton}>
                {"接続する"}
            </Button>
        </SContainer>
    );
};

const SContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "640px",
    padding: "2rem",
    background: "#eee",
});
export default DisconnectedPage;
