import React from 'react';

class ResponsiveViewPager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: props.initialPage,
    };
  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    return (
      React.Children.toArray(this.props.children)[this.state.page]
    );
  }
}

export default React.memo(ResponsiveViewPager);
