import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { BreedId } from '../../types';

type PetProfileHeader = {
	id: string,
	name: string,
	breed: BreedId
}

const PetProfileHeader: React.FC<PetProfileHeader> = ({
	id, name, breed
}) => {
	return (
		<div>
			<Card key={id}>
				<CardHeader title={name} subheader={breed.name}/>
			</Card>
		</div>
	);
};

export default PetProfileHeader;
