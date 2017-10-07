import * as React from "react";
import * as CSSModules from "react-css-modules";
import { Col, Grid, Row } from "react-flexbox-grid";
import { IVersionSelectorProps, IVersionSelectorState } from "./Schema/IVersionSelectorSchema";
import style from "./VersionSelector.styl";
export default class VersionSelector extends React.Component<IVersionSelectorProps, IVersionSelectorState> {
    public render() {
        return (
            <div className={style.versionSelectorContainer}>
                <Grid fluid>
                    <Row center="xs">
                        <Col lg={3} xs={12} >
                            <p className={style.libraryName}>{this.props.libraryName}</p>
                        </Col>
                        <Col lg={3} xs={12} >
                            <select value={this.props.current} onChange={this.onChangeField.bind(this)}>
                                {this.props.versions.map(v => (<option key={v} value={v}>{v}</option>))}
                            </select>
                        </Col>
                    </Row >
                </Grid>
            </div>
        );
    }

    public async onChangeField(event): Promise<void> {
        fetch(`/lib/${this.props.libraryName}/${event.target.value}`, {
            method: "POST",
        }).then(() => {
            location.reload();
        });
    }
}
