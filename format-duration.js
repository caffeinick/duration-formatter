function formatDuration(int) {
    if (typeof int !== "number" || int < 0) {
        return "This is not acceptable.";
    }

    if (int === 0) {
        return "now";
    }

    const oneSecond = 1;
    const oneMinute = 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneYear = oneDay * 365;

    const units = [
        { unit: oneYear, str: "year" },
        { unit: oneDay, str: "day" },
        { unit: oneHour, str: "hour" },
        { unit: oneMinute, str: "minute" },
        { unit: oneSecond, str: "second" },
    ];

    const { resultArr } = units.reduce(makeWords, { restDuration: int, resultArr: [] });
    // console.log(resultArr);
    const { resultStr } = resultArr.reduce(makeSentence, { resultStr: "" });

    // console.log(resultStr);
    return resultStr;
}

function makeWords(prev, cur) {
    if (prev.restDuration >= cur.unit) {
        const mok = parseInt(prev.restDuration / cur.unit, 10);
        const isS = mok > 1 ? "s" : "";
        const resultStr = `${mok} ${cur.str}${isS}`;

        prev.restDuration -= mok * cur.unit;
        prev.resultArr.push(resultStr);
    }

    return prev;
}

function makeSentence(prev, cur, idx, arr) {
    if (idx === 0) {
        prev.resultStr = `${cur}${prev.resultStr}`;
    } else if (idx < arr.length - 1) {
        prev.resultStr = `${prev.resultStr}, ${cur}`;
    } else if (idx === arr.length - 1) {
        prev.resultStr = `${prev.resultStr} and ${cur}`;
    }

    return prev;
}

export { formatDuration };
