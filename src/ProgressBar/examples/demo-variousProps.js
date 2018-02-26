/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
      <h3>remainingStyle backgroundColor: "green"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        remainingStyle={{backgroundColor: "green"}}
      />

      <h3>fillStyle backgroundColor: "green"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        fillStyle={{backgroundColor: "green"}}
      />

      <h3>labelFillColor="green"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        labelRemainingColor={"green"}
      />

      <h3>labelFillColor="#123"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        labelFillColor={"#123"}
      />

      <h3>remainingColor="red"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        remainingColor={"red"}
      />

      <h3>fillColor="red"</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        fillColor={"red"}
      />

      <h3>style</h3>
      <ProgressBar
        min={0}
        max={100}
        value={this.state.value}
        style={{height: 30}}
      />

      <h3>Label custom label className and style</h3>
      <ProgressBar
        min={0}
        max={100} value={this.state.value}
        labelStyle={{color: 'pink'}}
        labelClassname="cool-label"
      />

      <h3>Label render test</h3>
      <ProgressBar
        min={0}
        max={100} value={this.state.value}
        label={(props) => {
          return 'test'
        }}
      />
      <h3>Jsx</h3>
      <ProgressBar
        min={0}
        max={100} value={this.state.value}
        label={<strong>I am a strong jsx</strong>}
      />
      <h3>String</h3>
      <ProgressBar
        min={0}
        max={100} value={this.state.value}
        label="I am just a simple string"
      />


      <h1>Start of Directiom -1</h1>
      <h2>Label position remainingStart</h2>
      <ProgressBar
        direction={-1}
        min={0}
        max={100}
        value={this.state.value}
        orientation="vertical"
        labelPosition="remainingStart"
      />
      <ProgressBar
        direction={-1}
        min={0}
        max={100}
        value={this.state.value}
        labelPosition="remainingStart"
      />

      <h2>Label position remainingCenter</h2>
      <ProgressBar
        direction={-1}
        min={0}
        max={100}
        value={this.state.value}
        orientation="vertical"
        labelPosition="remainingCenter"
      />
      <ProgressBar
        direction={-1}
        min={0}
        max={100}
        value={this.state.value}
        labelPosition="remainingCenter"
      />
