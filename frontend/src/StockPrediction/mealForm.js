import React, { Component } from 'react'
import axios from 'axios'

class MealForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			mealId: '',
			week: '',
			meals:[]

		}
	}

	componentDidMount() {
        axios
            .get('/dropdown')
            .then(response => {
                console.log(response);
                this.setState({meals: response.data.meals
                })
                
            })
            .catch(error => {
                this.setState({errorMsg: 'Error retrieving cycle data'})
            })

    }
    
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		const data = {
			mealId: this.state.mealId,
			week: this.state.week
		}
		axios
			.post('/input', data)
			.then(response => {
				console.log(response.data)
				
				window.location="/nav/form/retrieve"

			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { mealId, week, meals} = this.state;

        let optionItems = meals.map((meal) =>
                <option key={meal}>{meal}</option>
            );
		      
		return (
			<div>
				<header >
					<h1>Find prediction for every meal</h1>
					<h2>Enter meal ID and number of weeks to view prediction!</h2>
				</header>
				<form onSubmit={this.submitHandler}>
					<div>
						<select type="text" name="mealId" value={mealId} onChange={this.changeHandler}>
							<option value="">Select Meal ID</option>
							{optionItems}
						</select>
					</div>

					<br></br>
					<div>
						<input
							style={{'border-radius':'7px',}}
                            placeholder="Weeks"
							type="text"
							name="week"
							value={week}
							onChange={this.changeHandler}
						/>
					</div>
					<br></br>
					<button style={{'border-radius':'7px',}} type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default MealForm