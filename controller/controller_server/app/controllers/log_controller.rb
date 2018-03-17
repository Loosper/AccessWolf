class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first;
    # puts "ROOM IS: #{json["room"]}"
    # @student = "blabla"
    if @student.nil?
      head 401
    else
      @currentattendance = CurrentAttendance.where(:student_id => @student.id).first

      if @currentattendance.nil? #GETTING IN
        @currentattendance = CurrentAttendance.new
        @currentattendance.student = @student
        @currentattendance.checkin = DateTime.now.to_s(:time)
        @currentattendance.room = json["room"]

        if @currentattendance.save!
          head 200
        else
          head 401
        end
      else #GETTING OUT
        @currentattendance.delete
        if @currentattendance.destroyed?

          @attendance = Attendance.new
          @attendance.date = DateTime.now.to_s
          @attendance.student_id = @student.id
          # @attendance.schedule = find_sch(@currentattendance.checkin, Time.now)
          # @attendance.attended = attended?(@attendance)
          find_sch
          @attendance.schedule_id = @schedule.id
          @attendance.attended = @attended
          if @attendance.save!
            head 200
          else
            head 402
          end
        else
          head 402
        end
      end
    end

  end

private

  def find_sch
    @schedule = Schedule.where(:room => @currentattendance.room).where("start_time >= ? AND end_time <= ?", @currentattendance.checkin.to_s(:time), DateTime.now.to_s(:time)).first

    @attended = "true"

    if @schedule.nil?
      puts "COULDNT FIND SCHEDULE room:#{@currentattendance.room}, #{@currentattendance.checkin.to_s(:time)}, #{DateTime.now.to_s(:time)}"
      head 332
    else
      puts "FOUND SCHEDULE #{@schedule.start_time}, #{@schedule.end_time}"
      head 200
    end

  end


end
