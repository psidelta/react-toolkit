//       <h1> steps </h1>

//       <h3>step=[20, 30, 50], rtl </h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         step={[20, 30, 50]}
//         showTicks={true}
//         labelPosition="fillCenter"
//         orientation="vertical"
//         rtl
//       />

//       <h3>step=[20, 30, 50], direction -1 </h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         step={[20, 30, 50]}
//         showTicks={true}
//         labelPosition="fillCenter"
//         orientation="vertical"
//         direction={-1}
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, showSteps=false</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps={false}
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//           orientation="vertical"
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, showTicks=false</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//         incrementInSteps={false}
//         showTicks={false}
//           orientation="vertical"
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, render tick</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//           orientation="vertical"
//         renderTick={(props) => {
//           const style = {
//             position: 'absolute',
//             bottom: '100%',
//             left: 0,
//             transform: 'translateX(-50%)'
//           }

//           props.children = <span style={style}>tick</span>
//         }}
//       />

//       <h3>show steps, step=[20, 30, 90] fillCenter, render step</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 90]}
//         labelPosition="fillCenter"
//         transition={false}
//           orientation="vertical"
//         renderStep={(props) => {
//           props.children = <span>step - {props.index}</span>
//         }}
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//           orientation="vertical"
//         incrementInSteps={false}
//       />

//       <h3>show steps, step=[20, 30, 80] fillCenter</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 80]}
//         labelPosition="fillCenter"
//         incrementInSteps={false}
//           orientation="vertical"
//       />

//       <h3>show steps, step=[20, 30, 34]</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 34]}
//           orientation="vertical"
//       />

//       <h3>show steps, step=[20, 30]</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30]}
//           orientation="vertical"
//       />

//       <h3>show steps, step=20</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={20}
//           orientation="vertical"
//       />

//       <h2>Horizontal</h2>
//       <h3>show ticks, tick=[20, 30, 50], direction -1</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         direction={-1}
//       />

//       <h3>show ticks, tick=[20, 30, 50] </h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         tick={[20, 30, 50]}
//         showTicks={true}
//         labelPosition="fillCenter"
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, showSteps=false</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps={false}
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, showTicks=false</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//         incrementInSteps={false}
//         showTicks={false}
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter, render tick</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//         renderTick={(props) => {
//           const style = {
//             position: 'absolute',
//             bottom: '100%',
//             left: 0,
//             transform: 'translateX(-50%)'
//           }

//           props.children = <span style={style}>tick</span>
//         }}
//       />

//       <h3>show steps, step=[20, 30, 90] fillCenter, render step</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 90]}
//         labelPosition="fillCenter"
//         transition={false}
//         renderStep={(props) => {
//           props.children = <span>step - {props.index}</span>
//         }}
//       />

//       <h3>show steps, step=[20, 30, 50] fillCenter</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 50]}
//         labelPosition="fillCenter"
//         transition={false}
//         incrementInSteps={false}
//       />

//       <h3>show steps, step=[20, 30, 80] fillCenter</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 80]}
//         labelPosition="fillCenter"
//         incrementInSteps={false}
//       />

//       <h3>show steps, step=[20, 30, 34]</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30, 34]}
//       />

//       <h3>show steps, step=[20, 30]</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={[20, 30]}
//       />

//       <h3>show steps, step=20</h3>
//       <ProgressBar
//         min={0}
//         max={100}
//         value={this.state.value}
//         showSteps
//         step={20}
//       />
