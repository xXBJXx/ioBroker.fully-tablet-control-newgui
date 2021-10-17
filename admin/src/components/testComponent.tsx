import React from 'react';
import { useIoBrokerState } from 'iobroker-react/hooks';

export const TestComponent: React.FC = () => {
	const [myState, , setMyState] = useIoBrokerState({
		id: 'fully_react_test.0.testVariable',
		defaultValue: 1,
	});

	React.useEffect(() => {
		// Changes "my-adapter.0.my-state" in ioBroker to 2 after one second
		setTimeout(() => setMyState(2), 1000);
	}, []);

	// Renders 1 until the state was read and the value of the state afterwards
	return <div>{myState}</div>;
};
