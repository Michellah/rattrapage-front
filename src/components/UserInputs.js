import { useState } from "react";
import patrimoinies from "../data/mockData.js";
import "../style/Style.css"
export const UserInputs = () => {
    const [selectedPatrimoine, setSelectedPatrimoine] = useState("");
    const [aggregat, setAggregat] = useState(false);
    const [tresorerie, setTresorerie] = useState(false);
    const [immobilisation, setImmobilisation] = useState(false);
    const [obligations, setObligations] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dailyFlux, setDailyFlux] = useState([]);
    const [impossibleFlux, setImpossibleFlux] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    const handleChangePatrimoine = (e) => {
        setSelectedPatrimoine(e.target.value);
    };

    const handleCheckboxChange = (setter) => (e) => {
        setter(e.target.checked);
    };

    const generateFlux = () => {
        let dailyFluxList = [];
        let impossibleFluxList = [];

        const selectedData = patrimoinies.find(item => item.name === selectedPatrimoine);

        if (startDate && endDate && selectedData) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let currentDate = start;

            let availableFunds = selectedData.tresorerie.reduce((sum, item) => sum + item.value, 0);

            while (currentDate <= end) {
                let formattedDate = currentDate.toISOString().split("T")[0];

                let action = `[${formattedDate}] `;
                let operationsPerformed = [];
                let operationsFailed = [];

                if (tresorerie) {
                    selectedData.tresorerie.forEach(item => {
                        if (availableFunds >= item.value) {
                            operationsPerformed.push(`(${item.name},${item.value})`);
                            availableFunds -= item.value;
                        } else {
                            operationsFailed.push(`(${item.name},${item.value})`);
                        }
                    });
                }

                if (immobilisation) {
                    selectedData.immobilisations.forEach(item => {
                        operationsPerformed.push(`(${item.name},${item.value})`);
                    });
                }

                if (obligations) {
                    selectedData.obligations.forEach(item => {
                        operationsPerformed.push(`(${item.name},${item.value})`);
                    });
                }

                if (operationsFailed.length > 0) {
                    impossibleFluxList.push(`[${formattedDate}]${operationsFailed.join(", ")}`);
                }

                if (operationsPerformed.length > 0) {
                    action += operationsPerformed.join(" ");
                    dailyFluxList.push(action.trim());
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return { dailyFluxList, impossibleFluxList };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { dailyFluxList, impossibleFluxList } = generateFlux();
        setDailyFlux(dailyFluxList);
        setImpossibleFlux(impossibleFluxList);
        const selectedData = patrimoinies.find(item => item.name === selectedPatrimoine);
        if (selectedData) {
            setImageUrl(selectedData.images);
        }
    };

    return (
        <div>
            <div className="box">
                <div className="flux-style">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="patrimoine">Patrimoine</label>
                        <select name="patrimoine" id="patrimoine" onChange={handleChangePatrimoine}>
                            <option value="">Sélectionnez un patrimoine</option>
                            <option value="Cresus">Cresus</option>
                        </select>
                        <br />

                        <input
                            type="checkbox"
                            id="aggregat"
                            checked={aggregat}
                            onChange={handleCheckboxChange(setAggregat)}
                        />
                        <label htmlFor="aggregat">Agrégat</label>
                        <input
                            type="checkbox"
                            id="tresorerie"
                            checked={tresorerie}
                            onChange={handleCheckboxChange(setTresorerie)}
                        />
                        <label htmlFor="tresorerie">Trésorerie</label>
                        <input
                            type="checkbox"
                            id="immobilisation"
                            checked={immobilisation}
                            onChange={handleCheckboxChange(setImmobilisation)}
                        />
                        <label htmlFor="immobilisation">Immobilisation</label>
                        <input
                            type="checkbox"
                            id="obligations"
                            checked={obligations}
                            onChange={handleCheckboxChange(setObligations)}
                        />
                        <label htmlFor="obligations">Obligations</label>
                        <br />

                        <label htmlFor="start-date">De</label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date">À</label>
                        <input
                            type="date"
                            id="end-date"
                            name="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <br />
                        <button type="submit">Soumettre</button>
                    </form>
                    <div className="flux">
                        <h3>!!Flux Impossibles!!</h3>
                        <ul className="list">
                            {impossibleFlux.map((flux, index) => (
                                <li key={index}>{flux}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flux">
                    <h3>!!Flux Journaliers!!</h3>
                    <ul className="list">
                        {dailyFlux.map((flux, index) => (
                            <li key={index}>{flux}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div>
                    <p>Patrimoine :{selectedPatrimoine} </p>
                    <img src={imageUrl} alt="Static Graph" />
                </div>
            </div>
        </div>
    );
};
