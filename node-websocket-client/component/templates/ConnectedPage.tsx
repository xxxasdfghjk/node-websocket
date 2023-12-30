import * as React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Message } from "../../src/App";
type Props = {
    onSubmitButton: (str: string) => void;
    messageList: Message[];
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
const STextFieldWrapper = styled("div")({
    padding: "1rem",
});

const ConnectedPage = (props: Props) => {
    const [message, setMessage] = React.useState<string>("");
    const messageRefs = React.useRef<React.RefObject<HTMLLIElement>[]>([]);
    messageRefs.current = props.messageList.map(() => React.createRef<HTMLLIElement>());
    React.useEffect(() => {
        setTimeout(() => {
            messageRefs.current.at(-1)?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
    }, [props.messageList]);

    return (
        <SContainer>
            <SMessageList>
                <SUl>
                    {props.messageList.map((message, index) => (
                        <SMessageWrapper
                            key={message.createdAt + index}
                            ref={messageRefs.current[index]}
                            isYou={message.isYou}
                        >
                            <SMessage isYou={message.isYou} key={message.createdAt}>
                                <SContent>{message.content}</SContent>
                                <SCreatedAt>{message.createdAt}</SCreatedAt>
                                <SCreatedBy>{message.createdBy}</SCreatedBy>
                            </SMessage>
                        </SMessageWrapper>
                    ))}
                </SUl>
            </SMessageList>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmitButton(message);
                }}
            >
                <STextFieldWrapper>
                    <TextField onChange={(e) => setMessage(e.currentTarget.value)}></TextField>
                </STextFieldWrapper>
                <Button type={"submit"} disabled={message.length === 0} variant={"outlined"}>
                    送る
                </Button>
            </form>
        </SContainer>
    );
};

const SMessageList = styled("div")({
    color: "black",
    width: "100%",
});
const SCreatedBy = styled("div")({});
const SContent = styled("div")({
    fontSize: "2rem",
});
const SCreatedAt = styled("div")({});
const SMessage = styled("div")(({ isYou }: { isYou: boolean }) => ({
    textAlign: isYou ? "right" : "left",
}));
const SMessageWrapper = styled("li")(({ isYou }: { isYou: boolean }) => ({
    display: "flex",
    justifyContent: isYou ? "right" : "left",
    textAlign: "right",
    listStyle: "none",
    width: "100%",
    fontFamily: "DotGothic16",
    padding: "8px;",
}));
const SUl = styled("ul")({
    padding: 0,
});

export default ConnectedPage;
