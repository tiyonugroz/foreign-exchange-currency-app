import React from 'react';
import {
	Item,
	Grid,
	Placeholder,
} from 'semantic-ui-react';

const GridPlaceholder = () => (
	<Grid celled data-test="placeholderComponent">
		<Grid.Row>
			<Grid.Column width={13}>
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Extra>
								<Placeholder>
									<Placeholder.Header>
										<Placeholder.Line as='h2' length='short' />
										<Placeholder.Line length='medium' />
										<Placeholder.Line length='long' />
									</Placeholder.Header>
								</Placeholder>
							</Item.Extra>
						</Item.Content>
					</Item>
				</Item.Group>
			</Grid.Column>
			<Grid.Column width={3}>
				<Placeholder style={{ height: 40, width: '100%', marginTop: '1em' }}>
					<Placeholder.Image />
				</Placeholder>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default GridPlaceholder;