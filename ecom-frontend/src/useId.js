import { useState } from "react";

export default function useId() {

    const getId = () => {
        const idString = localStorage.getItem('userid');
        return JSON.parse(idString);
    };

    const [userid, setUserid] = useState(getId());

    const saveId = userId => {
        localStorage.setItem('userid', JSON.stringify(userId));
        setUserid(userId.userid);
    };

    return {
        setUserid: saveId,
        userid
    }
}