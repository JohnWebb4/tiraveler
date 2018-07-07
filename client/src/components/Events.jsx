import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import Review from './Review';

/**
 * Closure to update event key to a specific value
 * @param {(event: *) => undefined} setEvent Function to set event
 * @param {*} event Current event values
 * @param {string} key Event key to update
 * @param {*} value Value to set
 */
const getKeySetter = (setEvent, event, key, value) => (
  () => {
    // Duplicate event
    const newEvent = Object.assign({}, event);

    newEvent[key] = value;

    setEvent(newEvent);
  }
);

/**
 * Displays and individual event
*/
const Event = ({ event, setEvent }) => (
  <Card>
    <Image style={{ width: '160px', height: '160px' }} src={event.image_url} />
    <Card.Content>
      <Card.Header>
        {event.name}
      </Card.Header>
    </Card.Content>
    <Card.Content extra style={{ backgroundColor: event.userRating === 1 ? 'green' : undefined }}>
      <Button positive onClick={getKeySetter(setEvent, event, 'userRating', 1)}>
        <Icon name="thumbs up" />
        Like
      </Button>
      <Button negative onClick={getKeySetter(setEvent, event, 'userRating', -1)}>
        <Icon name="thumbs down" />
        Dislike
      </Button>
    </Card.Content>
  </Card>
);

Event.propTypes = {
  event: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setEvent: PropTypes.func.isRequired,
};

/**
 * Returns closure to edit specific event
 * @param {(events: [*]) => undefined} setEvents functin to update all events
 * @param {[*]} events Array current events
 * @param {number} index Index of event
 */
const getEventSetter = (setEvents, events, index) => (
  (event) => {
    // Copy events
    const newEvents = events.slice();

    // Change event at index
    newEvents[index] = event;

    // Update events
    setEvents({ target: { value: newEvents } });
  }
);

  /**
   * Filter Events for liked events
   */
const getLikedEvents = events => (events.filter(event => event.userRating > 0));

/** Displays all events for user to check */
const Events = ({ budget, events, setEvents }) => (
  <React.Fragment>
    <Header>
      Select an Event
    </Header>
    <Card.Group itemsPerRow={5}>
    {
      events.map((event, index) => (
        <Event
          event={event}
          key={event.name}
          index={index}
          budget={budget}
          setEvent={getEventSetter(setEvents, events, index)}
        />
      ))
    }
    </Card.Group>
    <Review
      entries={getLikedEvents(events)}
    />
  </React.Fragment>
);

Events.propTypes = {
  budget: PropTypes.number,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setEvents: PropTypes.func.isRequired,
};

Events.defaultProps = {
  budget: 0,
};

export default Events;
