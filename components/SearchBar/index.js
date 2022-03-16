import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { useRouter } from 'next/router';

const SearchBar = () => {
   const [searchHandle, setSearchHandle] = useState();
	const router = useRouter();

	const handleSearch = () => {
      if (searchHandle !== undefined && searchHandle !== "")
		   router.push(`?userName=${searchHandle}`, undefined, { shallow: true });
      else 
		   router.push(`/`);
	};

	return (
		<Form
         style={{maxWidth:'500px'}}
         className=" w-100"
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch();
			}}>
			<div className="row">
				<div className="col-10">
					<Input
						type='text'
						name='Search'
						id='userName'
						placeholder='@handle'
						onChange={(e) => setSearchHandle(e.target.value)}
					/>
				</div>
				<div className="col-2 p-0">
					<Button outline color='primary' onClick={handleSearch}>Search</Button>
				</div>
			</div>
		</Form>
	);
};

export default SearchBar;
