import {Flex} from "react-native-flex-layout";
import {Button} from "react-native-paper";
import {Link} from "expo-router";

export default function Tab() {
    return (
        <Flex fill center>
            <Link href={'/components/Home'}>
                <Button mode='elevated'>Home</Button>
            </Link>
        </Flex>
    );
}
