import { ReactNode, Fragment } from "react";
import { GetDefinition } from "../BLOCComponents";
import HoverMark from "../HoverMark";
import Card, { CardSize } from "./Card";
import style from "./Card.module.scss";

interface LinkedDataCardProps {
    title: string;
    icon: ReactNode;
    data: any;
}

const LinkedDataCard: React.FC<LinkedDataCardProps> = ({
    title,
    icon,
    data,
}: LinkedDataCardProps) => {
    console.log(data);
    return (
        <Card title={title} icon={icon} size={CardSize.Full}>
            <div className={style.scrollable}>
                {data.map((datum: any, index: number) => {
                    let titleString = `Tweeted: ${datum.created_at}`;
                    if (datum.content_syntactic != "") {
                        titleString += `\nContent: ${GetDefinition(
                            datum.content_syntactic,
                        )}`;
                    }
                    if (datum.content_semantic_entity != "") {
                        titleString += `\nSubject: ${GetDefinition(
                            datum.content_semantic_entity,
                        )}`;
                    }

                    return (
                        <Fragment key={index}>
                            <HoverMark
                                data-title={titleString}
                                text={GetDefinition(datum["action"])}
                            />
                            {index !== data.length - 1 && ", "}
                        </Fragment>
                    );
                })}
            </div>
        </Card>
    );
};

export default LinkedDataCard;