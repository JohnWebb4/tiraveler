import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Divider, Input, Header, Container, Grid,
} from 'semantic-ui-react';
import { Route } from 'react-router-dom';

const styles = {
  bordered: {
    paddingTop: '11px',
  },
  all: {
    paddingTop: '80px',
  },
};

const go = (event) => {
  if (event.key === 'Enter') {
    document.getElementById('go').click();
  }
};

const searchService = () => {
  // $.post('/photos/search', {
  //   price: budget, location,
  // })
  //   .catch((error) => {
  //     console.log(error, 'problem submitting search');
  //   });
};

/**
 * Convert budget to number and update
 * @param {*}      event              Calling event
 * @param {*}      event.target       Calling object
 * @param {string} event.target.value Budget value
 * @param {*}      callback           Function to update budget state
 */
const convertBudgetToNumberAndUpdate = (event, callback) => {
  const numberEvent = Object.assign({}, event);
  numberEvent.target.value = Number(event.target.value);
  callback(numberEvent);
};

/**
 * Search For events in area and budget
 * @param {{handleBudget: {*}, handleLocation: {*}, appState: {*}}}
 */
const Search = ({
  handleBudget, handleLocation, name,
}) => (
  <div>
    <div className="ui equal width center aligned padded grid" style={styles.all}>
      <div className="ui twelve column centered grid">
        <div className="row">
          <Header size="large">
            <Divider horizontal>
            Hello
              {' '}
              { name }
!
            </Divider>
          </Header>
        </div>
        <div className="six column centered row">
          <Header size="huge">
          Where would you like to go?
          </Header>
        </div>
        <Container>
          <Grid>
            <div className="eight column centered row">
              <Input id="input-location" fluid size="huge" placeholder="Paradise..." onChange={handleLocation} onKeyPress={go} />
            </div>
            <div className="equal width row">
              <div className="column">
                <Header size="medium" floated="right" style={styles.bordered}>
                What is your budget?
                </Header>
              </div>
              <div className="column">
                <Input
                  id="input-budget"
                  type="number"
                  fluid
                  size="big"
                  onChange={e => convertBudgetToNumberAndUpdate(e, handleBudget)}
                  icon="dollar sign"
                  iconPosition="left"
                  onKeyPress={go}
                />
              </div>
            </div>
          </Grid>
        </Container>
        <div className="row">
          <Route render={({ history }) => (
            <Button
              id="go"
              fluid
              size="huge"
              color="blue"
              onClick={() => {
                history.push('/photos');
                // searchService(appState);
              }}
            >
              GO
            </Button>
          )}
          />
        </div>
      </div>
    </div>
  </div>
);

Search.propTypes = {
  /**
   * Update budget information
   * @param {{target: {value: {number}}}} event Event object
   */
  handleBudget: PropTypes.func.isRequired,

  /**
   * Update location information
   * @param {{target: {value: {string}}}} event Event object
   */
  handleLocation: PropTypes.func.isRequired,

  /**
   * Name of user
   * @param {string}
   */
  name: PropTypes.string.isRequired,
};

export default Search;
